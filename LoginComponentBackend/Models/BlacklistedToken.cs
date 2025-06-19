using System.ComponentModel.DataAnnotations;

namespace LoginComponentBackend.Models;

public class BlacklistedToken
{
    [Key]
    public string Token { get; set; }
    public DateTime ExpiryDate { get; set; }
}