import React from 'react'
interface Props{ 
    name: string, 
    bio: string, 
    children: (name: string, bio: string) => React.ReactNode 
}
class ProfileHeading extends React.Component<Props> {

    constructor(props: { name: string, bio: string, children: (name: string, bio: string) => React.ReactNode }) {
        super(props)
    }
    render(): React.ReactNode {
        return (
            <div>{this.props.children("rea", "ahammed")}</div>
        )
    }
}

export default ProfileHeading