//removed useState
import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"




// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    //const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()


    useEffect (() => {
        const fetchWorkouts = async () => {
            //Fetches data from the server
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                // array of json objects where each object is a workout
                //setWorkouts(json)
                
                //updates the global context state
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
        
    }, [dispatch]) // added dispatch to dependency array
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