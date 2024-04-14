
export default function PageHold({children} : { children: React.ReactNode}){
    return (
        <div className='page'>
            {children}
        </div>
    )
}