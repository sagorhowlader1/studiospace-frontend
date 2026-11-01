
"use client";



import { authClient } from "@/lib/auth-client";


const MyBookingsPage = () => {

    const { data: session } = authClient.useSession()
      
        const user = session?.user
    
        const handleBooing = async (e:React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault()
          const bookings = e.target.bookings.value
    
          const data = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...bookings,
    
          }
    
          const res = await fetch('http://localhost:8000/my-bookings-page', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'      
             },
             body: JSON.stringify(data)
             
          })
    
          const bookingData = await res.json()
          console.log(bookingData)
        }



    return (
        <div>
            My Bookings Page
        </div>
    );
};

export default MyBookingsPage;

