class Country {
  constructor({name,  score, rank, sdgs, region}) {
    this.name = name
    this.region = region
    this.score = score
    this.rank = rank
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

export default Country
