using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using clumsyapparel.Models;
using Microsoft.AspNetCore.Identity;

namespace clumsyapparel.Data;
public class clumsyapparelDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
   
}