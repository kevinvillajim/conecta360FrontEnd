import Template from "../../components/Template";

function Teams({ teams, users, metas }) {
  const calculateTeamProgress = (teamId) => {
    const teamMetas = metas.filter((meta) => meta.id_user_assigned === teamId);
    const totalValue = teamMetas.reduce(
      (acc, meta) => acc + parseInt(meta.value),
      0
    );
    const achievedValue = teamMetas.reduce(
      (acc, meta) => acc + parseInt(meta.achieved_value || 0),
      0
    );
    return (achievedValue / totalValue) * 100 || 0;
  };

  const calculateUserProgress = (userId) => {
    const userMetas = metas.filter((meta) => meta.id_user_assigned === userId);
    const totalValue = userMetas.reduce(
      (acc, meta) => acc + parseInt(meta.value),
      0
    );
    const achievedValue = userMetas.reduce(
      (acc, meta) => acc + parseInt(meta.achieved_value || 0),
      0
    );
    return (achievedValue / totalValue) * 100 || 0;
  };

  return (
    <>
      <Template
        content={
          <div>
            {teams.map((team) => (
              <div key={team.id}>
                <h2>{team.name}</h2>
                <div className="w-full rounded-full h-2.5 bg-gray-200">
                  <div
                    className={`${getColor(
                      calculateTeamProgress(team.id)
                    )} h-2.5 rounded-full`}
                    style={{ width: `${calculateTeamProgress(team.id)}%` }}
                  ></div>
                </div>
                {users
                  .filter((user) => user.id_team === team.id)
                  .map((user) => (
                    <div key={user.id}>
                      <p>{user.name}</p>
                      <div className="w-full rounded-full h-2.5 bg-gray-200">
                        <div
                          className={`${getColor(
                            calculateUserProgress(user.id)
                          )} h-2.5 rounded-full`}
                          style={{
                            width: `${calculateUserProgress(user.id)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        }
        title="Metas"
      />
    </>
  );
}

export default Teams;
