namespace server.Models
{
    public class EditCamperDTO
    {
        public int CamperId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public int GenderId { get; set; }
        public int BunkId { get; set; }

        public string ParentFirstName { get; set; } = string.Empty;
        public string ParentLastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}