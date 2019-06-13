class Country {
  constructor({name,  score, rank, sdgs, region}) {
    this.name = name
    this.region = region
    this.score = score
    this.rank = new SortableRank(rank)
    this.sdgs = sdgs
  }

  // Return the SDG instance
  getSDG(sdg) {
    return this.sdgs[Number(sdg) - 1]
  }

  // Return lowercase slug without any special characters
  // Cote d'Ivoire -> cote-divoire
  slug() {
    return this.name.toLowerCase().replace(/[,.']/g,'').replace(/ /g, '-')
  }

  // Return the url for the country
  url() {
    return `/${this.slug()}`
  }

  localeCompare(otherCountry) {
    return this.name.localeCompare(otherCountry.name)
  }
}

// Wrapper class for ranking that allows for custom sorting, where null
// shows up at the end.
// It is an easier alternative to writing a custom sort method:
// https://github.com/gregnb/mui-datatables
class SortableRank {
  constructor(rank) {
    this.rank = rank
  }

  isNaN() {
    return this.rank === null
  }

  toString() {
    return this.isNaN() ? "Not ranked" : this.rank
  }

  // positive number = appear at end of list
  // negative number = appear at beginning of list
  localeCompare(otherRank) {
    if(this.isNaN())
      return +1
    else if(otherRank.isNaN())
      return -1
    else
      return this.rank - otherRank.rank
  }
}

export default Country
