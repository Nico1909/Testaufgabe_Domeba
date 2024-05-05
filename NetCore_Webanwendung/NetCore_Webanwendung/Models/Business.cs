namespace NetCore_Webanwendung.Models
{
    public class Business
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string IndustryType { get; set; }
        public List<int> UserIds { get; set; } = new List<int>();
    }
}
