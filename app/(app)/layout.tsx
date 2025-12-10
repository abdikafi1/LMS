

import {ClerkProvider} from '@clerk/nextjs'
function AppLaout({children}:Readonly<{children :React.ReactNode}>) {
  return (
  

   <ClerkProvider>
   <div>
    {children}
   </div>
    </ClerkProvider>
  )
}

export default AppLaout

