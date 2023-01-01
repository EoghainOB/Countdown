import React from 'react'

const Progress = ({countdown, time}) => {

    const progress = 100 - ((countdown / time) * 100) 
    
    const parentBar = {
        height: '50px',
        width: '100%',
        backgroundColor: '#eeeeee',
    }
      
    const childBar = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: 'blue',
        transition: '1s',
    }
        
    return (
        <div className="progress">
            <div style={parentBar}>
                <div style={childBar}>
                </div>
            </div>
        </div>
    )
}

export default Progress