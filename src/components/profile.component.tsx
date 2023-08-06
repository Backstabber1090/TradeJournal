import { Component } from "react"

type Props = {}

type State = {
  redirect: string | null
}

export default class Profile extends Component<Props, State> {
  render() {
    return (
      <div className="Auth-form-content">
        <div className="text-center">
          Profile Page
          <h3>This is your portfolio</h3>
        </div>
      </div>
    )
  }
}
