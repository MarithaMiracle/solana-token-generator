// app/layout.jsx

export const metadata = {
    title: 'Solana Token Generator',
    description: 'Mint tokens directly to your wallet',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  