export default class DistrictRepository {
  constructor(data) {
    this.stats = this.eliminateDupes(data)
  }
  
  eliminateDupes(array) {
    let stats = array.reduce((acc, item) => {
      const district = item.Location.toUpperCase()

      if (!acc[district]) {
      acc[district] = []
      }
      
      if(acc[district]) {
        acc[district].push(item)
      }

      return acc
    },{})

    return stats
  }

  findByName(name) {
    let statKeys = Object.keys(this.stats)
// console.log(this.stats)
    if (name) {
      var capName = name.toUpperCase()
    }   
    
    if (!name || !statKeys.includes(capName)){
      return undefined
    } else if (statKeys.includes(capName)) {
      let districtObj = statKeys.find((school) => {
        if (this.stats[school] === this.stats[capName]) {
          return this.stats[school]
        }
      })
      // console.log(districtObj)
    }
  }
}
