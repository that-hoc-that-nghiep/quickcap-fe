import { parseMarkdownToHTML } from '@/utils/common'
import LoadingDots from './loading-dot'
import { VideoMessage } from '@/types/conversation'
import { IconMessageChatbot, IconUser } from '@tabler/icons-react'

const Message = ({ role, content }: VideoMessage) => {
    return (
        <div className={`mb-4 flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`flex max-w-[25rem] items-end gap-2 overflow-x-auto rounded-lg ${
                    role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
                <div className='flex flex-col items-center h-full'>
                    <div className={`flex p-2 rounded-full ${role === 'ai' ? 'bg-gray-100' : 'bg-[#E22862]'} `}>
                        {role === 'ai' ? <IconMessageChatbot /> : <IconUser size={20} className='text-white' />}
                    </div>
                </div>

                <div
                    className={`rounded-lg px-3 shadow-md w-full ${
                        role === 'user' ? 'bg-[#E22862] text-white' : 'bg-gray-100'
                    }`}
                >
                    {role === 'ai' && content === 'l' ? (
                        <LoadingDots />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: parseMarkdownToHTML(content)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
export default Message
