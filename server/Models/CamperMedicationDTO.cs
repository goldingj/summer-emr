namespace server.Models
{
    public class CamperMedicationDTO
    {
        public int CamperMedicationId { get; set; }
        public int CamperId { get; set; }
        public int MedicationId { get; set; }
        public string Dosage { get; set; } = string.Empty;
        public string DosageUnit { get; set; }
        public string Frequency { get; set; }
        public string Instructions { get; set; }
    }
}