const LoadingDots = () => {
    return (
        <div className='flex space-x-1 py-4'>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-300'></div>
        </div>
    )
}

export default LoadingDots
