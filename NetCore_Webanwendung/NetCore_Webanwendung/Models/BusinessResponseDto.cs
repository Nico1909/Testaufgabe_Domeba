namespace NetCore_Webanwendung.Models
{
    public record struct BusinessResponseDto (int Id, string Name, List<User> Users)
    {
    }
}
