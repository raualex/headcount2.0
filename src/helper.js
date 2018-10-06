export default class DistrictRepository {
  constructor(data) {
    this.stats = this.eliminateDupes(data);
  }
  
  eliminateDupes(array) {
    let stats = array.reduce((acc, item) => {
      const district = item.Location.toUpperCase();
      const districtData = this.defaultData(item.Data);

      if (!acc[district]) {
        acc[district] = {[item.TimeFrame]: districtData};
      }
      
      if (acc[district]) {
        acc[district] = {...acc[district],
          [item.TimeFrame]: districtData};
      }

      return acc;
    }, {});

    return stats;
  }

  defaultData(itemData) {
    if (typeof itemData !== 'number') {
      return 0;
    } else {
      return Math.round(itemData*1000)/1000;
    } 
  }

  findByName(name) {
    let statKeys = Object.keys(this.stats);
    let capName;

    if (name) {
      capName = name.toUpperCase();
    }   
    
    if (!name || !statKeys.includes(capName)){
      return undefined;
    } else if (statKeys.includes(capName)) {
      return {
        location: capName,
        stats: this.stats[capName]
      };
    }
  }

  searchForPrefix(word) {
    let statKeys = Object.keys(this.stats);
    return statKeys.map((key) => {
      if (key.startsWith(word)) {
        return true;
      } else {
        return false;
      }
    });
  }

  findAllMatches(name) {
    let statKeys = Object.keys(this.stats);
    let matchOutput = [];
    let capName;

    if (name) {
      capName = name.toUpperCase();
    }

    if (!name) {
      let matchData = statKeys.map((key) => {
        return {[key]: this.stats[key]};
      });
      matchOutput = matchData;
      return matchOutput;

    } else if (statKeys.includes(capName) || this.searchForPrefix(capName)) {
      let matchData2 = statKeys.reduce((acc, key) => {
        if (key === capName || key.startsWith(capName)) {
          acc.push({[key]: this.stats[key]});
        }
        return acc;
      }, []);
      matchOutput = matchData2;
      return matchOutput;
    } else if (!statKeys.includes(capName)) {
      return [];
    }
  }

  findAverage(district) {
    let distCap = district.toUpperCase();
    let foundDistrict = Object.values(this.stats[distCap]);
    return foundDistrict.reduce((acc, dataNum, index) => {
      acc += dataNum;
      if (index === foundDistrict.length - 1) {
        return Math.round((acc/foundDistrict.length)*1000)/1000;
      }
      return acc;
    }, 0); 
  }

  compareDistrictAverages(district1, district2) {
    let dist1 = district1.toUpperCase();
    let dist2 = district2.toUpperCase();
    let dist1avg = this.findAverage(district1);
    let dist2avg = this.findAverage(district2);
    let distRatio = Math.round((dist1avg/dist2avg)*1000)/1000;
    return { [dist1]: dist1avg, 
      [dist2]: dist2avg, 
      compared: distRatio
    };
  }
}
