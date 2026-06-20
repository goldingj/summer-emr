namespace server.Models
{
    public class CamperAllergyDTO
    {
        public int CamperId {  get; set; }
        public List<int> AllergyIds { get; set; }
    }
}