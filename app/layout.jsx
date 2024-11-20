import './globals.css'
 
export const metadata = {
  
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-black'>
      <body className='bg-black'>{children}</body>
    </html>
  )
}