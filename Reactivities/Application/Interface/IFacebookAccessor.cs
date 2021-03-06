using System.Threading.Tasks;
using Application.User;

namespace Application.Interface
{
    public interface IFacebookAccessor
    {
        Task<FacebookUserInfo> FacebookLogin(string accessToken);
    }
}