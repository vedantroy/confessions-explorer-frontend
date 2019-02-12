import React, { Component } from 'react'
import Confession from './Confession'
import moment from 'moment'

class PostFeed extends Component {

    containerElement = null

    isLoading = false
    hasMore = true
    index = 0

    state = {
        confessions: []
    }

    generateArray(n) {
        let arr = []
        for (let i = 0; i < n; i++) {
            arr[i] = i
        }
        return arr
    }

    //Load data
    componentDidMount() {
        this.appendNextPosts()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.queryParams !== this.props.queryParams) {
            console.log("Query Params Updated--Resetting Page")
            this.hasMore = true
            this.index = 0
            this.setState({
                confessions: []
            }, () => {
                this.appendNextPosts()
            })
        }
    }

    async appendNextPosts() {
        console.log("index: " + this.index)
        this.isLoading = true
        const url = new URL("http://localhost:3001/small")
        url.search = new URLSearchParams({ ...this.props.queryParams, index: this.index })

        const confessions = await fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log("Failed to fetch data:")
                console.log(error)
            })

        //Case: Errors

        //Server sends confessions in batches of 10. If the batch is less than 10,
        //the server is out
        confessions.map(confession => confession.timestamp = moment.unix(confession.timestamp).format("MM-DD-YYYY"))
        if (confessions.length < 10) {
            this.hasMore = false
        }
        this.index += 1

        /*
        this.state.confessions.map(existingConf => {
            confessions.map(newConf => {
                if (newConf.facebook_id === existingConf.facebook_id) {
                    console.log("WARNING: " + newConf.facebook_id)
                }
            })
        })
        */

        this.isLoading = false
        this.setState(prevState => ({
            confessions: prevState.confessions.concat(confessions),
        }), () => {
            if (this.hasMore) {
                const lastChild = this.containerElement.lastChild
                const rect = lastChild.getBoundingClientRect()
                if (rect.top + rect.height < this.containerElement.clientHeight) {
                    this.appendNextPosts()
                } else {
                    this.isLoading = false
                }
            } else {
                this.isLoading = false
            }
        })
    }

    render() {
        return (
            <div
                style={{ height: "100%", overflow: "auto", padding: "0px 20px" }}
                onScroll={() => {
                    if (this.containerElement.clientHeight + this.containerElement.scrollTop >= this.containerElement.scrollHeight - (this.containerElement.clientHeight / 5)) {
                        if (!this.isLoading && this.hasMore) {
                            this.appendNextPosts()
                        }
                    }
                }}
                ref={ref => this.containerElement = ref}
            >
                {
                    this.state.confessions.map(confession => (
                        <Confession
                            key={confession.facebook_id}
                            source={confession.group}
                            date={confession.timestamp}
                            reacts={confession.reacts.Total}
                            text={confession.text}
                            confessionId={confession.facebook_id} />
                    ))
                }
            </div>
        )
    }

}

export default PostFeed