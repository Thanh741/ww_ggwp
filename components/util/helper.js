// IF HE DEAD
//  CHECK IF HE WAS HEAL BY DOCTOR OR SAVE BY WITCH
// IF WITCH KILL HIM NO ONE CAN SAVE HIM
export const checkDeadStatus = (status) => {
  let isDead = false
  isDead = status.filter((i) => (i.includes('dead'))).length > 0
  if (isDead) {
    isDead = !status.filter((i) => (i.includes('healByDoctor'))).length > 0
    isDead = !status.filter((i) => (i.includes('saveByWitch'))).length > 0
  }
  isDead = status.filter((i) => (i.includes('killByWitch'))).length > 0 ? true : isDead
  return isDead
}

export const checkDeadStatusLastNight = (status) => {
  let isDead = false
  isDead = status.filter((i) => (i.includes('dead'))).length > 0
  if (isDead) {
    isDead = !status.filter((i) => (i.includes('healByDoctor'))).length > 0
    isDead = !status.filter((i) => (i.includes('saveByWitch'))).length > 0
  }

  isDead = status.filter((i) => (i.includes('killByWitch'))).length > 0 ? true : isDead
  isDead = status.filter((i) => (i.includes('deadByPeople'))).length > 0 ? false : isDead

  return isDead
}

export const checkDeadByPeople = (status) => (status.filter((i) => i.includes('deadByPeople')).length > 0)

export const callOrder = [
  {key: 0, role: 'Werewolf'},
  {key: 1, role: 'Witch'},
  {key: 2, role: 'Doctor'},
  {key: 3, role: 'Seer'},
]

export const findPersonByRole = (role, days, currentDay) => {
  return days.filter(day => day.day === currentDay)[0].survivors.filter(survivor => survivor.role === role)
}
