import VideoCard from '@/pages/(main)/_components/video-card'
import { useVideos } from '@/services/video.service'
import { useParams } from 'react-router'

const VideoCategoris = () => {
    const { orgId, categoryId } = useParams()
    const { data } = useVideos(orgId!, { categoryId: categoryId! })
    return (
        <>
            {data?.data?.videos.filter((c) => !c.isDeleted).map((video) => <VideoCard key={video._id} video={video} />)}{' '}
            {data?.data?.videos.length === 0 && 'No videos'}
        </>
    )
}

export default VideoCategoris
