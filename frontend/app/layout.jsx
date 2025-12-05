export const metadata = {
    title: 'Vikash Portfolio Admin',
    description: 'This is admin page to access all the feture to login now admin..',
}
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body  cz-shortcut-listen="true">
                {children}
            </body>

        </html>
    )
}
