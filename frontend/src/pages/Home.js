//removed useState
import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    //const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()


    useEffect (() => {

        const fetchWorkouts = async () => {

            
            /* Fix to get token by manually appending to the headers
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token;
            const response = await fetch("/api/posts", {
                headers: {
                   authorization: `Bearer ${token}`     
                }

            */
            
            //Fetches data from the server and manually puts bearer token into the headers
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // array of json objects where each object is a workout
                //setWorkouts(json)
                
                //updates the global context state
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user) {
            fetchWorkouts()
        }
        
    }, [dispatch, user]) // added dispatch to dependency array
    return (
        <div className="home">
            <div className='workouts'>
                {/* Only if there are workouts, map out the workouts to print data for each one */}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home