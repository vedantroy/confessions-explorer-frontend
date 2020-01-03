import isEqual from "lodash.isequal";
import React, { Component } from "react";
import Confession from "./Confession";
import dayjs from "dayjs";

class PostFeed extends Component {
  mounted = undefined;
  containerElement = null;

  isLoading = false;
  hasMore = true;
  index = 0;

  state = {
    confessions: []
  };

  componentDidMount() {
    this.mounted = true;
    this.appendNextPosts();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.queryParams, this.props.queryParams)) {
      this.hasMore = true;
      this.index = 0;
      this.setState(
        {
          confessions: []
        },
        () => {
          this.appendNextPosts();
        }
      );
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async appendNextPosts() {
    this.isLoading = true;
    //const url = new URL("https://api.confs.app/confessions")
    const prodURL = "https://api.confs.app/confessions";
    const devURL = "http://localhost:8000/confessions";
    const url = new URL(prodURL);
    url.search = new URLSearchParams({
      ...this.props.queryParams,
      index: this.index
    });

    let confessions = await fetch(url)
      .then(result => result.json())
      .catch(error => {
        console.log("Failed to fetch data:");
        console.log(error);
      });

    //Server sends confessions in batches of 10. If the batch is less than 10,
    //the server is out
    confessions = confessions.map(confession => {
      const { fb_id, text, time, ...reacts } = confession;
      return {
        fb_id,
        text,
        time: dayjs.unix(confession.time).format("MM-DD-YYYY"),
        reacts
      };
    });
    if (confessions.length < 10) {
      this.hasMore = false;
    }
    this.index += 1;

    this.isLoading = false;
    // Don't set state after unmount. Prevents memory leak.
    if (!this.mounted) {
      return;
    }
    this.setState(
      prevState => ({
        confessions: prevState.confessions.concat(confessions)
      }),
      () => {
        if (this.hasMore) {
          const lastChild = this.containerElement.lastChild;
          const rect = lastChild.getBoundingClientRect();
          if (rect.top + rect.height < this.containerElement.clientHeight) {
            this.appendNextPosts();
          } else {
            this.isLoading = false;
          }
        }
      }
    );
  }

  render() {
    //console.log(this.props.queryParams)
    return (
      <div
        style={this.props.style}
        onScroll={() => {
          if (
            this.containerElement.clientHeight +
              this.containerElement.scrollTop >=
            this.containerElement.scrollHeight -
              this.containerElement.clientHeight / 5
          ) {
            if (!this.isLoading && this.hasMore) {
              this.appendNextPosts();
            }
          }
        }}
        ref={ref => (this.containerElement = ref)}
      >
        {this.state.confessions.map(confession => (
          <Confession
            key={confession.fb_id}
            source={confession.group}
            date={confession.time}
            text={confession.text}
            confessionId={confession.fb_id}
            reacts={confession.reacts}
          />
        ))}
      </div>
    );
  }
}

export default PostFeed;
