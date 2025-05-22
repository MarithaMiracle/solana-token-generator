// app/layout.js
export const metadata = {
    title: 'Solana Token Generator',
    description: 'Create Solana tokens easily',
};

export default function RootLayout({ children }) {
    return ( <html lang = "en">
        <head/>
        <body> { children } </body> </html>
    );
}