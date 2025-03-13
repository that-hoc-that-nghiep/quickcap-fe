import VideoCard from '@/pages/(main)/_components/video-card'
import { useVideos } from '@/services/video.service'
import { useParams } from 'react-router'

const Videos = () => {
    const { orgId } = useParams()
    const { data } = useVideos(orgId!)
    return <>{data?.data?.videos.map((video) => <VideoCard key={video._id} video={video} />)}</>
}

export default Videos
