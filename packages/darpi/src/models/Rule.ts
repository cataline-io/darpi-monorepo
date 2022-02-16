export default interface Rule {
  name: string
  field: string
  test: (value: string) => Promise<true | string>
}
