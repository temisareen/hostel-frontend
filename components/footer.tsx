export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Caleb University</h3>
            <p className="text-gray-300 mb-4">
              Hostel Allocation System - Efficient room allocation for academic excellence.
            </p>
            <p className="text-sm text-gray-400">
              Designed and Implemented by: <strong>Jemerigbe Toluwanimi</strong>
            </p>
            <p className="text-sm text-gray-400">
              Matric Number: <strong>21/8477</strong>
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/about" className="hover:text-white">
                  About System
                </a>
              </li>
              <li>
                <a href="/student" className="hover:text-white">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: hostel@caleb.edu.ng</li>
              <li>Phone: +234 (0) 123 456 7890</li>
              <li>Address: Caleb University, Lagos</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Caleb University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
