import React, { Component } from 'react';
import styled from 'styled-components';

/*

this.setState

*/



export default function loggify(Wrapped) {

    let originals = {}

    const methodsToLog = ["componentWillMount",
                         "componentDidMount",
                         "componentWillUnmount",
                        "componentWillReceiveProps",
                        "shouldComponentUpdate",
                        "componentWillUpdate",
                        "componentDidUpdate"]

    methodsToLog.forEach( (method) => {
        
        if (Wrapped.prototype[method]) {
            originals[method] = Wrapped.prototype[method]

        }

        Wrapped.prototype[method] = function(...args) {

            let original = originals[method]

            console.groupCollapsed(`${Wrapped.displayName} called${method}`)

            if (method === 'componentWillRecieveProps' ||
                            'shouldComponentUpdate' ||
                            'componenetWillUpdate') {
                console.log("nextProps", args[0])
            }

            if (method === 'shouldComponentUpdate' || 
                            'componentWillUpdate') {
console.log("nextState", args[1])
}

if (method === "componentDidUpdate") {
    console.log("prevProps", args[0])
    console.log("prevState", args[1])
}

            console.groupEnd()

            if (original) {
                original = original.bind(this)
                return original(...args)
            }

            if (
                method === "shouldComponentUpdate" && 
                typeof original === 'undefined'
            ) {
                return true
            }
        }

            Wrapped.prototype.setState = function(partialState, callBack) {
                console.groupCollapsed(`${Wrapped.displayName} setState`)
                console.log('partialState', partialState)
                console.log('callback', callBack)
                console.groupEnd()
                this.updater.enqueueSetState(this, partialState, callBack, 'setState')
            }
    })

    return class extends Component {

        render() {
            return (
                <LoggerContainer>
                <H2>
                    {Wrapped.displayName} is now loggified
                    </H2>
                    <Wrapped
                    {...this.props}
                    />
                    </LoggerContainer>
            )
        }
    }
}

const LoggerContainer = styled.div `
background-color: aliceblue;
border: 2px grooved aquamarine;
border-radius: 5px;
`

LoggerContainer.displayName = "LoggerContainer"

const H2 = styled.h2`
    color: blueviolet;
`

H2.displayName = H2