import RegisterCard from '@/app/components/register-card';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 200 }),
    }) as Promise<Response>
);

describe('RegisterCard component', () => {
  test('registers user successfully', async () => {
    const { container, getByText } = render(<RegisterCard />);

    const inputValues = [
      { name: 'username', value: 'testuser' },
      { name: 'email', value: 'test@example.com' },
      { name: 'password', value: 'password123' },
      { name: 'confirmPassword', value: 'password123' },
    ];

    await userEvent.setup();

    for (const { name, value } of inputValues) {
      const inputEl = container.querySelector(`input[name="${name}"]`);
      if (inputEl) await userEvent.type(inputEl, value);
    }

    const registerButton = getByText('Register');
    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        }),
      });

      expect(getByText('Registration Successful!')).toBeInTheDocument();
    });
  });
});
