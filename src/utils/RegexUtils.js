class RegexUtils {

    static regexEmail = new RegExp("^([a-z0-9A-Z_-]+[-|\\.]?)+[a-z0-9A-Z_-]@([a-z0-9A-Z_-]+(-[a-z0-9A-Z_-]+)?\\.)+[a-zA-Z]{2,}$")

    static regexPhone = new RegExp(/^(\+?84|0)(\d{9,10})$/)

    static regexPhoneLand = new RegExp("^[\s.(.)\.\,.0-9]{10,20}$")

}

export default RegexUtils;