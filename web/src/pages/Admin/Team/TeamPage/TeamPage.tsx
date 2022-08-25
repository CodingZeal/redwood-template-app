import TeamCell from 'src/components/Admin/Team/TeamCell'

type TeamPageProps = {
  id: string
}

const TeamPage = ({ id }: TeamPageProps) => {
  return <TeamCell id={id} />
}

export default TeamPage
