export default function Footer() {
    return (
        <footer className="mt-24 py-12 border-t border-card-border flex flex-col md:flex-row justify-between items-center text-text-dim text-sm gap-4">
            <p>© 2026 Alfred. Designed for the Future.</p>
            <div className="flex gap-6">
                <span className="hover:text-text-main cursor-pointer transition-colors">Home</span>
                <span className="hover:text-text-main cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-text-main cursor-pointer transition-colors">Contact</span>
            </div>
        </footer>
    );
}