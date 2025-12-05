import Image from 'next/image'
function DevImg({containerStyles,imgSrc}) {
  return (
    <div className={containerStyles}>
      <Image src={imgSrc} priority fill alt='VikashDev'/>
    </div>
  )
}

export default DevImg