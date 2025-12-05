'use client'
import { RiLinkedinFill, RiGithubFill, RiInstagramFill, RiFacebookFill } from 'react-icons/ri';
import Link from 'next/link';
import { useEffect } from 'react';

function Socials({ containerStyles, iconsStyles, socialLink }) {
    useEffect(() => {

    }, [socialLink])
    const icons = [
        {
            path: socialLink?.githubLink || "https://github.com/vikashalex",
            name: <RiGithubFill />,
        },
        {
            path: socialLink?.linkedinLink || "https://www.linkedin.com/in/vikash-kumar-75a507288/",
            name: <RiLinkedinFill />,
        },
        {
            path: 'https://www.facebook.com/vikash.alex.14942/',
            name: <RiFacebookFill />,
        },
        {
            path: 'https://www.instagram.com/heart_less_637/',
            name: <RiInstagramFill />,
        },
    ]

    return (
        <div className={containerStyles}>
            {icons.map((icon, index) => {
                return <Link href={icon.path} target='_blank' className='cursor-pointer' key={index}>
                    <div className={iconsStyles}>{icon.name}</div>
                </Link>
            })}
        </div>
    )
}

export default Socials