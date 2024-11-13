import { useState } from 'react'

const Button = (props) => {

  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr><td>{props.name}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {

  const getAverage = (average) => {

    const goodScore = average[0] * 1
    const neutralScore = average[1] * 0
    const badScore = average[2] * -1

    const avg = (goodScore + badScore) / (average[0] + average[1] + average[2])

    return isNaN(avg) ? 0 : avg
  }

  const getPercentage = (percentage) => {
    const prcnt = percentage[0] / (percentage[0] + percentage[1] + percentage[2]) * 100
    return isNaN(prcnt) ? 0 : prcnt
  }

  return (
    <table>
      <tbody>
        <StatisticsLine name='good' value={props.all[0]} />
        <StatisticsLine name='neutral' value={props.all[1]} />
        <StatisticsLine name='bad' value={props.all[2]} />
        <StatisticsLine name='all' value={props.all.reduce((sum, val) => sum + val, 0)} />
        <StatisticsLine name='average' value={getAverage(props.all)} />
        <StatisticsLine name='percentage' value={getPercentage(props.all) + '%'} />
      </tbody>
    </table>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clicked = (buttonName) => {
    console.log("inside good")
    switch (buttonName) {
      case "good":
        setGood(good + 1)
        break;
      case "neutral":
        setNeutral(neutral + 1)
        break;
      case "bad":
        setBad(bad + 1)
        break;
      default:
        break;

    }
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => clicked("good")} name='good' />
      <Button handleClick={() => clicked("neutral")} name='neutral' />
      <Button handleClick={() => clicked("bad")} name='bad' />

      <h1>statistics</h1>

      {
        (good === 0 && neutral === 0 && bad === 0) ?
          <p>no feedback given</p>
          :
          <Statistics all={[good, neutral, bad]} />
      }
    </div>
  )
}

export default App