import React, { useEffect, userRef, useState } from "react";
import { useParams } from "react-router";
import { createConsumer } from "@rails/actioncable"
import ChannelMessageCreateContainer from "./channel_message_create_container";
import MessageBodyContainer from "./channel_message_body_container";

function ChannelMessages(props) {

      if (!props.channel) {
            return null
      }
      const [messages, setMessages] = useState([])
      const params = useParams()


      useEffect(() => {
            props.fetchChannel(props.channel.id)
            //const cable = createConsumer("ws://localhost:3000/cable")
            const cable = createConsumer('wss://ruckkus.herokuapp.com/cable')

            const paramsToSend = {
                  channel: "ChannelChannel",
                  id: props.channel.id
            }

            const handlers = {
                  received(data) {
                        setMessages([...messages, data])
                  },

                  connected() {
                        console.log('connected')
                  },

                  disconnected() {
                        console.log("disconnected")
                  }
            }

            const subscription = cable.subscriptions.create(paramsToSend, handlers)

            return function cleanup() {
                  // console.log("unsubbing from ", params.channelId)
                  subscription.unsubscribe()
            }

      }, [props.channel.id, messages])



      const messageProfile = (userId) => {
            const user = props.users[userId]
            if (!user) return null
            let profilePicUrl
            (user.user_url === '') ?
                  profilePicUrl = "https://sidcord-dev.s3.us-west-1.amazonaws.com/icon_blue.png" :
                  profilePicUrl = user.user_url

            return (
                  <img className="message-profile" src={profilePicUrl}  />
            )
      }

      const messageDate = (timestamp) => {
            const timeStamp = timestamp.slice(0, 10).split("-")
            const year = timeStamp.shift()
            timeStamp.push(year)
            const date = timeStamp.join("/")
            return (
                  <div className="message-date">{date}</div>
            )
      }

      const content = () => {
            console.log(props.messages)
            return (
                  <div className="messages-body">
                  <ul>
                        {
                              Object.values(props.messages).map(message => {
                              
                                    return (
                                          <li className="channel-message" key={message.id * message.content.length * Math.random(10000)} id={`message-${message.id}`}>
                                                {messageProfile(message.user.id)}
                                                <div className="message-info-shell">
                                                      <div className="message-info">
                                                            <div className="message-username">{message.user.username}</div>
                                                            {messageDate(message.created_at)}
                                                      </div>
                                                      <div className="message-body-shell" id={message.id}>
                                                            <MessageBodyContainer message={message} />
                                                      </div>
                                                </div>
                                          </li>
                                    )
                              })
                        }
                  </ul>
            </div>

            )
      }

      return (
            <div className="channel-messages-shell">
                  {content()}

                  <ChannelMessageCreateContainer channel={props.channel} />

            </div>
      )
}

export default ChannelMessages