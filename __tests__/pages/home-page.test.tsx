// import Home from '@/app/home/page';
// import { render, waitFor } from '@testing-library/react';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

// jest.mock('next-auth');
// const mockedGetServerSession = getServerSession as jest.Mock;
// mockedGetServerSession.mockResolvedValue({ user: { userRole: 2 } });

// jest.mock('next/navigation');
// describe('Home page', () => {
//   test('redirects to login page if no session exists', async () => {
//     mockedGetServerSession.mockReturnValueOnce(null);

//     const { container } = render(<Home />);

//     await waitFor(() => {
//       expect(redirect).toHaveBeenCalledWith('/login');
//     });
//   });

//   test('does not redirect if session exists and user role is 2', async () => {
//     const { container } = render(<Home />);

//     await waitFor(() => {
//       expect(redirect).not.toHaveBeenCalled();
//     });
//   });
// });
