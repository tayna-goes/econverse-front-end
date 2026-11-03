import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const payload = {
  success: true,
  products: [
    { productName: 'Iphone 11 PRO MAX BRANCO 1', descriptionShort: 'Descrição A', photo: 'a.png', price: 15000 },
    { productName: 'IPHONE 13 MINI 1', descriptionShort: 'Descrição B', photo: 'b.png', price: 9000 },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(payload) }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('monta a vitrine com os produtos do JSON e abre o modal ao clicar', async () => {
    const user = userEvent.setup();
    render(<App />);

    const showcase = (await screen.findAllByRole('region', { name: /produtos relacionados/i }))[0];
    const cards = await within(showcase).findAllByRole('article');
    expect(cards).toHaveLength(2);

    await user.click(within(cards[1]).getByRole('button', { name: /ver detalhes de iphone 13 mini 1/i }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'IPHONE 13 MINI 1' })).toBeInTheDocument();
    expect(within(dialog).getByText('R$ 9.000,00')).toBeInTheDocument();
    expect(within(dialog).getByText('Descrição B')).toBeInTheDocument();
  });

  it('usa o JSON local quando a API remota falha', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('CORS'))
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(payload) });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    expect(await screen.findAllByText('IPHONE 13 MINI 1')).not.toHaveLength(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
