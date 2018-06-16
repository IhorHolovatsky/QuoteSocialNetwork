using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QSN.Helpers
{
    public class ResponseWrapper<T>
    {
        public T Item { get; set; }
        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
    }
}
