const items = new Array(22).fill(0)

export default function GalleryMain( props ) {

    let counter = 0

    return (
        <div className = "grid grid-cols-2 md:grid-cols-4 gap-8 m-8" >
            {
            items.map( i => {
                counter++
                return (
                    <div key={counter}
                    className = "w-48 h-96 bg-gray-100 rounded">
                        test
                        { props.children }
                    </div>
                )
            })
            }
        </div>
    )
}