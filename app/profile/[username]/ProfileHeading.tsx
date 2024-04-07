import React from 'react'

class ProfileHeading extends React.Component<{ name: string, bio: string, children: (name: string, bio: string) => React.ReactNode }> {

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