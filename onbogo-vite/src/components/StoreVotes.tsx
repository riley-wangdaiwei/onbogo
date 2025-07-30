import React, { useEffect } from 'react'

type StoreVotesProps = {
  selectedId: string | null
  events: {
    id: string
    amount: string | null
    fee: string | null
    tokenName: string | null
  }[]
}

const STORAGE_KEY = 'votedSentences'

export default function StoreVotes({ selectedId, events }: StoreVotesProps) {
  useEffect(() => {
    if (!selectedId) return

    const votedEvent = events.find(event => event.id === selectedId)
    if (!votedEvent) return

    const sentence =
      votedEvent.amount && votedEvent.fee && votedEvent.tokenName
        ? `Your professor just got ${votedEvent.amount} ${votedEvent.tokenName} with gas fee of ${votedEvent.fee}.`
        : 'Data incomplete.'

    // Get existing votes from localStorage
    const existingVotes = localStorage.getItem(STORAGE_KEY)
    let votes: string[] = existingVotes ? JSON.parse(existingVotes) : []

    // Avoid duplicate entries
    if (!votes.includes(sentence)) {
      votes.push(sentence)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
      console.log('Vote stored:', sentence)
    }
  }, [selectedId, events])

  return null
}
