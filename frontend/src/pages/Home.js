import { useEffect, useState } from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect (() => {
        const fetchWorkouts = async () => {
            //Fetches data from the server
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                // array of json objects where each object is a workout
                setWorkouts(json)
            }
        }
        fetchWorkouts()
    }, [])
    return (
        <div className="home">
            <div className='workouts'>
                {/* Only if there are workouts, map out the workouts to print data for each one */}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Home