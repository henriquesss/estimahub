export const EstimativeCard = ({ description, stack, devs, time }) => {
    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-left">
            <h5 className="mb-2 w-60 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{description}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">tecnologias: {stack.toString()}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">tempo (em dias): {time}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">devs: {devs}</p>
       </div>
    )
}