import { IconBell, IconCreditCard, IconHome, IconLibrary, IconSettings } from '@tabler/icons-react'
import { SpotlightActionData } from '@mantine/spotlight'
import { Category } from '@/types'

export const service = {
    auth: 'https://auth.quickcap.live',
    backend: 'https://backend.quickcap.live',
    sso: 'https://sso.quickcap.live'
}

export const menuItems = [
    {
        label: 'Home',
        icon: IconHome,
        path: '/home',
        show: true
    },
    {
        label: 'My library',
        icon: IconLibrary,
        path: '/library',
        show: true
    },
    {
        label: 'Notifications',
        icon: IconBell,
        path: '/notifications',
        show: true
    },
    {
        label: 'Billing',
        icon: IconCreditCard,
        path: '/billing',
        show: true
    },
    {
        label: 'Settings',
        icon: IconSettings,
        path: '/settings',
        show: true
    },
    {
        label: 'Upload video',
        icon: IconSettings,
        path: '/upload',
        show: false
    }
]

export const mockCategories: Category[] = [
    {
        _id: '1',
        name: 'Design',
        orgId: '123'
    },
    {
        _id: '2',
        name: 'Development',
        orgId: '123'
    },
    {
        _id: '3',
        name: 'Business',
        orgId: '123'
    },
    {
        _id: '4',
        name: 'Marketing',
        orgId: '123'
    }
]

export const mockVideos = [
    {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'Vlc Media Player',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
            "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25254545 Subscribers',
        isLive: true
    },
    {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
        duration: '12:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'Blender Inc.',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
            'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25254545 Subscribers',
        isLive: true
    },
    {
        id: '3',
        title: 'For Bigger Blazes',
        thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'T-Series Regional',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
            'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25254545 Subscribers',
        isLive: true
    },
    {
        id: '4',
        title: 'For Bigger Escape',
        thumbnailUrl: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'T-Series Regional',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
            " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '25254545 Subscribers',
        isLive: false
    },
    {
        id: '5',
        title: 'Big Buck Bunny',
        thumbnailUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'Vlc Media Player',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
            "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25254545 Subscribers',
        isLive: true
    },
    {
        id: '6',
        title: 'For Bigger Blazes',
        thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'T-Series Regional',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
            'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25254545 Subscribers',
        isLive: false
    },
    {
        id: '7',
        title: 'For Bigger Escape',
        thumbnailUrl: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '8:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'T-Series Regional',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
            " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '25254545 Subscribers',
        isLive: true
    },
    {
        id: '8',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
        duration: '12:18',
        uploadTime: 'May 9, 2011',
        views: '24,969,123',
        author: 'Blender Inc.',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
            'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25254545 Subscribers',
        isLive: false
    }
]

export const mockNotifications = [
    'You have a new message from John Doe',
    'Your subscription is about to expire',
    'New video uploaded by John Doe',
    'Invitation to join a group',
    'Video was liked by John Doe',
    'Video was shared by John Doe'
]

export const actions: SpotlightActionData[] = []

export const MAX_FILE_SIZE = 50 // MB

export const CLOUD_FRONT_URL = 'https://d13e9bff825cyt.cloudfront.net'
