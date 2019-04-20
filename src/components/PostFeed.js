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
        this.isLoading = true
        const url = new URL("https://api.confs.app/confessions")
        //const url = new URL('http://localhost:3000/confessions')
        url.search = new URLSearchParams({ ...this.props.queryParams, index: this.index })

        const confessions = await fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log("Failed to fetch data:")
                console.log(error)
            })

        //Server sends confessions in batches of 10. If the batch is less than 10,
        //the server is out
        confessions.map(confession => confession.time = moment.unix(confession.time).format("MM-DD-YYYY"))
        if (confessions.length < 10) {
            this.hasMore = false
        }
        this.index += 1

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
                            key={confession.fb_id}
                            source={confession.group}
                            date={confession.time}
                            reacts={confession.reacts.Total}
                            text={confession.text}
                            confessionId={confession.fb_id} />
                    ))
                }
            </div>
        )
    }

}

export default PostFeed
